import { useEffect } from "react";
import loadjs from "loadjs";
function Load() {
  useEffect(() => {
    const scripts = [
      // "assets/js/jquery.min.js",
      "assets/js/extra.js",
      "assets/plugins/bootstrap/js/bootstrap.min.js",
      "assets/plugins/bootstrap/js/bootsnav.js",
      "assets/js/viewportchecker.js",
      "assets/js/slick.js",
      "assets/plugins/bootstrap/js/wysihtml5-0.3.0.js",
      "assets/plugins/bootstrap/js/bootstrap-wysihtml5.js",
      "assets/plugins/aos-master/aos.js",
      "assets/plugins/nice-select/js/jquery.nice-select.min.js",
      "assets/js/custom.js",
      // "assets/mycustom.js",
    ];

    scripts.forEach((script) => loadjs(script, { async: true }));
  }, []);

  return null;
}
export default Load;
