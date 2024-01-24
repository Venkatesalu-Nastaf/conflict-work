import { useState, useEffect } from 'react';
import axios from 'axios';

const useRegistration = () => {

    const user_id = localStorage.getItem('useridno');

    const [warning, setWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState({});
  
    const [activeMenuItem, setActiveMenuItem] = useState('');
  
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }, []);
  
    const [userPermissions, setUserPermissions] = useState({});
  
    useEffect(() => {
      const fetchPermissions = async () => {
        try {
          const currentPageName = 'Register page';
          const response = await axios.get(`http://localhost:8081/user-permissions/${user_id}/${currentPageName}`);
          setUserPermissions(response.data);
        } catch (error) {
          console.error('Error fetching user permissions:', error);
        }
      };
  
      fetchPermissions();
    }, [user_id]);
  
    const checkPagePermission = () => {
      const currentPageName = 'Register page';
      const permissions = userPermissions || {};
  
      if (permissions.page_name === currentPageName) {
        return {
          read: permissions.read_permission === 1,
          new: permissions.new_permission === 1,
          modify: permissions.modify_permission === 1,
          delete: permissions.delete_permission === 1,
        };
      }
  
      return {
        read: false,
        new: false,
        modify: false,
        delete: false,
      };
    };
  
    const permissions = checkPagePermission();
  
    const hidePopup = () => {
  
      setWarning(false);
  
    };
  
    useEffect(() => {
      if (warning) {
        const timer = setTimeout(() => {
          hidePopup();
        }, 3000);
        return () => clearTimeout(timer);
      }
    }, [warning]);
  
    useEffect(() => {
      if (!permissions.read) {
        // Set the warning state and message if the user doesn't have read permission
        setWarning(true);
        setWarningMessage('You do not have permission');
      } else {
        // Clear the warning state and message if the user has read permission
        setWarning(false);
        setWarningMessage('');
      }
    }, [permissions.read]);
  
    useEffect(() => {
      const storedActiveMenuItem = localStorage.getItem('activeMenuItem');
      setActiveMenuItem(storedActiveMenuItem || '');
    }, []);
  
    const handleMenuItemClick = (menuItem) => {
      const permissions = checkPagePermission();
  
      if (permissions.read && permissions.read) {
        localStorage.setItem('activeMenuItem', menuItem);
        setActiveMenuItem(menuItem);
      } else {
        setWarning(true);
        setWarningMessage("You do not have permission.");
      }
    };
  

    return {
        warning,
        warningMessage,
        hidePopup,
        isLoading,
        activeMenuItem,
        handleMenuItemClick,
        permissions,
    };
};

export default useRegistration;