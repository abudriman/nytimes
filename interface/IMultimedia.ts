import ILegacy from "./ILegacy";

interface IMultimedia {
    rank: number;
    subtype: string;
    caption: string;
    credit: string;
    type: string;
    url: string;
    height: number;
    width: number;
    legacy: ILegacy;
    crop_name: string;
}

export default IMultimedia