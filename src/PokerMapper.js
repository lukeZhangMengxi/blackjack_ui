
function poker_maper(encode, extension) {
    let tmp = encode.split('#');
    var rst = '';
    
    // Value number
    if (parseInt(tmp[0]) > 1 && parseInt(tmp[0]) <= 10) {
        rst += tmp[0];
        
    } else {
        switch(tmp[0]) {
            case '1': rst += 'A'; break;
            case '11': rst += 'J'; break;
            case '12': rst += 'Q'; break;
            case '13': rst += 'K'; break;
            default: return '';
        }
    }

    // Color
    switch(tmp[1]) {
        case '0': rst += 'C'; break;
        case '1': rst += 'D'; break;
        case '2': rst += 'H'; break;
        case '3': rst += 'S'; break;
        default: return '';
    }

    return rst + extension;
}

// console.log(poker_maper('1#1', '.png'));    // expect 'AD.png'
// console.log(poker_maper('8#0', '.png'));    // expect '8C.png'
// console.log(poker_maper('10#2', '.png'));    // expect '10H.png'
// console.log(poker_maper('13#3', '.png'));    // expect 'KS.png'

export const getPokerImgName = poker_maper;
