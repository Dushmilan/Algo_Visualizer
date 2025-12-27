export const sleep = (ms, controlRef) => {
    return new Promise((resolve, reject) => {
        const check = () => {
            if (controlRef.current.isStopped) {
                reject('STOPPED');
                return;
            }
            if (controlRef.current.isPaused) {
                setTimeout(check, 50); // Check again in 50ms
                return;
            }
            setTimeout(resolve, ms);
        };
        check();
    });
};
