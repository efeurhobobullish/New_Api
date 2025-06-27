//_________________________Code Implanted By Maher Zubair_________________________//
exports.runtime = (seconds) => {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    let dDisplay = d > 0 ? `${d} day${d === 1 ? '' : 's'}, ` : '';
    let hDisplay = h > 0 ? `${h} hour${h === 1 ? '' : 's'}, ` : '';
    let mDisplay = m > 0 ? `${m} minute${m === 1 ? '' : 's'}, ` : '';
    let sDisplay = s > 0 ? `${s} second${s === 1 ? '' : 's'}` : '';

    return dDisplay + hDisplay + mDisplay + sDisplay;
}
//end of file

