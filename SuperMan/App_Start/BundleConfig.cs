using System.Web;
using System.Web.Optimization;

namespace SuperMan
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery", "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js").Include("~/Content/Script/jquery/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js").Include("~/Content/Script/bootstrap/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/Css", "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css").Include("~/Content/Css/bootstrap/bootstrap.css"));

            BundleTable.EnableOptimizations = true;
            bundles.UseCdn = true;
        }
    }
}