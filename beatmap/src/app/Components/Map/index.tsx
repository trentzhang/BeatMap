import dynamic from "next/dynamic";

const LazyMap = dynamic(() => import("./GeolocationMap"), { ssr: false });

export default LazyMap;
