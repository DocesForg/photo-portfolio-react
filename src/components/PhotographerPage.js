// PhotographerPage.js
import GalleryPage from "./GalleryPage";
import { API_URL } from './api';

const PhotographerPage = ({
  userLikes,
  setUserLikes,
  currentUser,
  currentIP,
}) => {
  // Добавлены пропсы
  return (
    <GalleryPage
      endpoint={`${API_URL}/api/photos/?user_id=3&format=json`}
      pageTitle="Фотографии"
      addButtonText="Add Photo"
      userLikes={userLikes} // Передаем пропс
      setUserLikes={setUserLikes} // Передаем пропс
      currentUser={currentUser} // Передаем currentUser
      currentIP={currentIP}
    />
  );
};

export default PhotographerPage;
