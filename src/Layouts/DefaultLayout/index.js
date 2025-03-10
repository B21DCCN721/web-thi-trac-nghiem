import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import PropTypes from 'prop-types';

function DefaultLayout({ children }) {
  return (
    <div className="container mx-0 min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

DefaultLayout.propTypes = { 
  children: PropTypes.node,
}

export default DefaultLayout;
