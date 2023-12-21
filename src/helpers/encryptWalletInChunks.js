export const encryptWalletInChunks = (wallet, passwordHash, onProgress) => {
  return new Promise((resolve, reject) => {
    let progress = 0;

    function nextChunk() {
      setTimeout(async () => {
        progress += 0.1;
        onProgress(progress);

        if (progress >= 1) {
          try {
            const encryptedWalletData = await wallet.encrypt(passwordHash);
            resolve(encryptedWalletData);
          } catch (error) {
            reject(error);
          }
        } else {
          nextChunk();
        }
      }, 0);
    }

    nextChunk();
  });
};
