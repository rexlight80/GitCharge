import Mellowtel from "mellowtel";
import { MELLOWTEL_PUBLIC_KEY } from "./env";


(async () => {
    const mellowtel = new Mellowtel(MELLOWTEL_PUBLIC_KEY); // Replace with your configuration key
    await mellowtel.initContentScript();
})();