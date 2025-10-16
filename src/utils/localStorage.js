export function getVoterIdentifier(uuid) {
    const voteData = JSON.parse(localStorage.getItem("sugupochi-votes") || "{}");
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    let changed = false;
    let isVoted = false;
  
    Object.keys(voteData).forEach((key) => {
        if (now - voteData[key].timestamp > oneDay) {
            delete voteData[key];
            changed = true;
        }
        if (key === uuid) {
            isVoted = true;
        }
    })
  
    if (changed) {
      localStorage.setItem("sugupochi-votes", JSON.stringify(voteData));
    }
  
    if (isVoted) {
        return true;
    }
}

export function saveVoterIdentifier(uuid) {
    const now = Date.now();

    let voteData = JSON.parse(localStorage.getItem("sugupochi-votes") || "{}");

    voteData[uuid] = {
        voted: true,
        timestamp: now
    };

    localStorage.setItem("sugupochi-votes", JSON.stringify(voteData));
}

export function getVerifiedPasscode(uuid) {
    const voteData = JSON.parse(localStorage.getItem("sugupochi-verified") || "{}");
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    let changed = false;
    let isVerified = false;
  
    Object.keys(voteData).forEach((key) => {
        if (now - voteData[key].timestamp > oneDay) {
            delete voteData[key];
            changed = true;
        }
        if (key === uuid) {
            isVerified = true;
        }
    })

    if (changed) {
      localStorage.setItem("sugupochi-verified", JSON.stringify(voteData));
    }
  
    if (isVerified) {
        return true;
    }
}

export function saveVerifiedPasscode(uuid) {
    const now = Date.now();

    let voteData = JSON.parse(localStorage.getItem("sugupochi-verified") || "{}");

    voteData[uuid] = {
        verified: true,
        timestamp: now
    };

    localStorage.setItem("sugupochi-verified", JSON.stringify(voteData));
}