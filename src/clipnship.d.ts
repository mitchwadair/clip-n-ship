type NumericString = `${number}`;
// https://developer.mozilla.org/en-US/docs/Web/CSS/length
type CSSAbsoluteLengthUnit = "cm" | "mm" | "Q" | "in" | "pc" | "pt" | "px";
// purposely excluding container relative length units (unless someone REALLY wants them)
type CSSRelativeLengthUnit =
    | "cap"
    | "ch"
    | "em"
    | "ex"
    | "ic"
    | "lh"
    | "rlh"
    | "rem"
    | "vw"
    | "vh"
    | "vmin"
    | "vmax"
    | "vb"
    | "vi";
type CSSAngleUnit = "deg" | "grad" | "rad" | "turn";
type CSSLengthUnit = CSSAbsoluteLengthUnit | CSSRelativeLengthUnit;
type CSSLengthString = `${number}${CSSLengthUnit}`;
type CSSPercentageString = `${number}%`;
type CSSAngleString = `${number}${CSSAngleUnit}` | "0";

type CSSFilter =
    | `blur(${CSSLengthString})`
    | `brightness(${CSSPercentageString | NumericString})`
    | `contrast(${CSSPercentageString | NumericString})`
    | `drop-shadow(${CSSLengthString} ${CSSLengthString} ${CSSLengthString} ${string})`
    | `grayscale(${CSSPercentageString | NumericString})`
    | `hue-rotate(${CSSAngleString})`
    | `invert(${CSSPercentageString | NumericString})`
    | `opacity(${CSSPercentageString | NumericString})`
    | `saturate(${CSSPercentageString | NumericString})`
    | `sepia(${CSSPercentageString | NumericString})`
    | `url(${string})`;

type Filter = CSSFilter | Array<CSSFilter> | "none";

type Layer = {
    name: string;
    scale: number;
    filter: Filter;
    source: HTMLVideoElement;
};

type FinishCallback = (data: Blob) => void;
type ProgressCallback = (percent: number) => void;

declare class ClipConverter {
    constructor(video: URL, outputWidth?: number, outputHeight?: number);

    getPreview(width?: CSSLengthString | CSSPercentageString): HTMLCanvasElement;
    addLayer(name: string, scale: number, filter?: Filter): Array<Layer>;
    getLayer(name: string): Layer;
    removeLayer(name: string): Array<Layer>;
    getLayers(): Array<Layer>;
    updateLayerScale(name: string, scale: number): Array<Layer>;
    updateLayerFilter(name: string, filter: Filter): Array<Layer>;
    previewPlay(): void;
    previewPause(): void;
    previewReset(): void;
    render(fps: number, onFinishCallback?: FinishCallback, onProgressCallback?: ProgressCallback): void;
}
