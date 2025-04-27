import GalleryPage from "./GalleryPage";
import { API_URL } from './api';


const ArtistPage = ({ userLikes, setUserLikes, currentUser, currentIP }) => {
  return (
    <GalleryPage
      endpoint={`${API_URL}/api/photos/?user_id=2&format=json`}
      pageTitle="Художественная галерея"
      addButtonText="Add Artwork"
      userLikes={userLikes} // Передаем пропс
      setUserLikes={setUserLikes} // Передаем пропс
      currentUser={currentUser} // Передаем currentUser
      currentIP={currentIP}
    />
  );
};

export default ArtistPage;
