import { useCallback } from 'react';

export function useSelectFile({accept, multiple} = {}) {
    const selectFile = useCallback(() => {
        return new Promise((resolve, reject) => {
            const body = document.querySelector('body');
            const selector = document.createElement('input');
            selector.setAttribute('type', 'file');
            if (accept) {
                selector.setAttribute('accept', accept.join(', '));
            }
            selector.setAttribute('multiple', multiple ?? false);
            selector.style.display = 'none';
            body.appendChild(selector);
            selector.addEventListener('change', event => {
                for (const file of event.target.files) {
                    if (accept && !accept.find(x => x === file.type)) {
                        selector.remove();
                        reject('Archivo inválido.');
                        return;
                    }
                }
                const files = event.target.files;
                selector.remove();
                resolve(files);
            });
            selector.click();
        });
    }, [accept, multiple]);

    return selectFile;
}
