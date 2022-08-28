class UserSettings {
    static empty() {
        let obj = new UserSettings();
        obj.darkMode = 'SYSTEM';
        obj.color = null;
        obj.archiveOnComplete = true;
    }
}