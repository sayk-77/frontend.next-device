export function isAdmin(): boolean {
    const token = localStorage.getItem('token');
  
    if (!token) {
      return false;
    }
  
    try {
      const payload = token.split('.')[1];
  
      const decoded = JSON.parse(atob(payload));
  
      const isExpired = Date.now() >= decoded.exp * 1000;
  
      if (isExpired) {
        return false;
      }
  
      return decoded.role === 'admin';  
    } catch (error) {
      console.error('Ошибка при декодировании токена:', error);
      return false;
    }
  }