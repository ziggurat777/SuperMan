using System.Web;
using System.Web.Optimization;

namespace SuperMan
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/googleMap").Include(
               "~/Content/Script/googlemap.js",
               "~/Content/Script/markerclusterer.js"));
            bundles.Add(new ScriptBundle("~/bundles/superJs").Include("~/Content/Script/create.js"));


            bundles.Add(new StyleBundle("~/bundles/superCss").Include(
                "~/Content/Css/2-col-portfolio.css",
                "~/Content/Css/font-awesome.min",
                "~/Content/Css/stepbar.css",
                "~/Content/Css/custom.css"));

            BundleTable.EnableOptimizations = true;
            bundles.UseCdn = true;
        }
    }
}