using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SuperMan.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CreateMission()
        {
            return View();
        }

        public ActionResult SearchMission()
        {
            return View();
        }

        public ActionResult CustomerInfo()
        {
            return View();
        }
    }
}
