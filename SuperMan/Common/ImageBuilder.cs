using System.Web.Mvc;

namespace SuperMan.Common
{
    public static class ImageBuilder
    {
        private const string ImagePath = "../Content/Image/";

        public static MvcHtmlString ImageUrl(this HtmlHelper helper, string text)
        {
            return MvcHtmlString.Create(ImagePath + text);
        }
    }
}