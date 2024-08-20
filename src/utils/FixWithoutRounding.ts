export const FixWithoutRounding = (v: any, l: any) => {
    const intPart = Math.trunc(v).toString();
    const fractionPart = v.toString().slice(v.toString().indexOf(".") + 1);
    if (fractionPart.length > l) {
        return Number(intPart.concat(".", fractionPart.slice(0, l)));
    } else {
        const padded = intPart.concat(".", fractionPart.padEnd(l, "0"));
        return padded;
    }
};