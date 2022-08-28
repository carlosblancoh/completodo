import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import { useSnapshotOne } from '../hooks/firebase';
import useBufferChanges from '../hooks/useBufferChanges';
import { useIsLoggedIn, useUser } from '../hooks/user';
import { useSelectFile } from '../hooks/useSelectFile';
import Profile from '../pages/Profile';
import { v4 as uuid } from 'uuid';
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

export default function ProfileController() {
    const isLoggedIn = useIsLoggedIn();
    const user = useUser();
    const selectFile = useSelectFile({accept: ['image/jpeg', 'image/png', 'image/bmp']});
    const navigate = useNavigate();

    const reference = useMemo(
        () => {
            if (user !== undefined) {
                return doc(db, 'users', user.uid);
            } else {
                return undefined;
            }
        },
        [user],
    );
    const [_loading, userData, _error] = useSnapshotOne(reference);

    const [imageURL, setImageURL] = useState(undefined);
    useEffect(
        async () => {
            if (userData) {
                const pathReference = ref(storage, userData.profilePicture);
                const URL = await getDownloadURL(pathReference);
                setImageURL(URL);
            } else {
                setImageURL(undefined);
            }
        },
        [userData],
    );

    const onChange = useCallback((value) => {
        if (value != undefined) {
            setDoc(reference, value);
        }
    }, [reference]);

    const [bufferedData, bufferedOnChange] = useBufferChanges(userData, onChange);

    async function onProfilePictureChange() {
        const files = await selectFile();
        if (files.length > 0) {
            const profilePictureFile = files[0];
            const extension = profilePictureFile.name.split('.').pop();
            const path = '/profile-pictures/' + uuid() + '.' + extension;
            const profilePictureRef = ref(storage, path);
            await uploadBytes(profilePictureRef, profilePictureFile);
            const oldProfilePicturePath = userData.profilePicture;
            await updateDoc(reference, {profilePicture: path});
            if (oldProfilePicturePath !== '/profile-pictures/default.png') {
                const oldProfilePictureRef = ref(storage, oldProfilePicturePath);
                await deleteObject(oldProfilePictureRef);
            }
        }
    }

    function onNavigateToTrash() {
        return navigate('/trash');
    }

    /*function onBack() {
        return navigate('/');
    }onBack-1 test*/
    function onBack() {
        return navigate(-1);
    }

    function validatePassword(password) {
        if (password.length > 128){
            return 'La contraseña introducida es demasiado larga.';
        }
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/.exec(password) === null) {
            return 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.';
        }
        return undefined;
    }

    async function onPasswordChange({password, newPassword}) {
        const error = validatePassword(newPassword);
        if (error) {
            throw error;
        }
        const credential = EmailAuthProvider.credential(user.email, password);
        const userCredential = await reauthenticateWithCredential(user, credential);
        await updatePassword(userCredential.user, newPassword);
    }

    async function onDelete({password}) {
        const credential = EmailAuthProvider.credential(user.email, password);
        const userCredential = await reauthenticateWithCredential(user, credential);
        await deleteUser(userCredential.user);
        const oldProfilePicturePath = userData.profilePicture;
        if (oldProfilePicturePath !== '/profile-pictures/default.png') {
            const oldProfilePictureRef = ref(storage, oldProfilePicturePath);
            await deleteObject(oldProfilePictureRef);
        }
        const itemsReference = collection(db, 'users', user.uid, 'items');
        const items = await getDocs(itemsReference);
        items.forEach(item => deleteDoc(doc(itemsReference, item.id)));
        await deleteDoc(reference);
    }

    function onLogOut() {
        auth.signOut();
    }

    if (isLoggedIn === false) {
        return (
            <Navigate to = '/login'/>
        );
    } else if (bufferedData !== undefined){
        return <Profile
            value = {bufferedData}
            email = {user.email}
            profilePicture = {imageURL}
            onProfilePictureChange = {onProfilePictureChange}
            onChange={bufferedOnChange}
            onViewTrash = {onNavigateToTrash}
            onBack = {onBack}
            validatePassword = {validatePassword}
            onPasswordChange = {onPasswordChange}
            onLogOut = {onLogOut}
            onDelete = {onDelete}
        />;
    } else return null;
}
