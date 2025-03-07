import { Link, useLocation } from "react-router-dom";
import routes from "../routes"; // Import routes
import './PageNavigator.css';

const PageNavigator = ({ group }) => {
  const location = useLocation(); // Get current URL
  const groupRoutes = routes.filter(route => route.group === group);
  const currentIndex = groupRoutes.findIndex((route) => route.path === location.pathname);

  // Get previous and next pages
  const prevPage = currentIndex > 0 ? groupRoutes[currentIndex - 1] : null;
  const nextPage = currentIndex < groupRoutes.length - 1 ? groupRoutes[currentIndex + 1] : null;

  return (
    <div className="page-navigator">
      {/* Left Arrow (Hidden on First Page) */}
      {prevPage && (
        <Link to={prevPage.path} className="nav-link left">
          ⬅ {prevPage.title}
        </Link>
      )}

      {/* Right Arrow (Hidden on Last Page) */}
      {nextPage && (
        <Link to={nextPage.path} className="nav-link right">
          {nextPage.title} ➡
        </Link>
      )}
    </div>
  );
};

export default PageNavigator;
