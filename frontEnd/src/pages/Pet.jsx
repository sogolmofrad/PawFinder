import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserAuth } from "../contexts/UserAuthContext";
import ApplicationPopup from "../components/ApplicationPopup";

function Pet() {
  const { id } = useParams();
  const [pet, setPet] = useState({});
  const [images, setImages] = useState([]);
  const [curImage, setCurImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); //Inna: I added this line
  const { user, isAuthenticated } = useUserAuth();
  const [isFavorite, setIsFavorite] = useState(
    user?.favorites.includes(id) || false
  );
  const navigate = useNavigate();

  useEffect(
    function () {
      async function getPet() {
        try {
          setLoading(true);
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/pets/${id}`
          );
          setPet(res.data);
          setImages(res.data.pictures || []);
          setCurImage(res.data.pictures?.[0]);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      }
      getPet();
    },
    [id]
  );

  const calculateAge = (birthDate) => {
    const now = new Date();
    const birth = new Date(birthDate);

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    return years > 0
      ? `${years} year${years > 1 ? "s" : ""}`
      : `${months} month${months > 1 ? "s" : ""}`;
  };

  function handleCurImage(img) {
    const index = images.indexOf(img.src);
    setCurImage(images[index]);
  }

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated || !user?.userId) {
      alert("Please log in to manage favorites.");
      navigate("/login");
      return;
    }
    try {
      if (isFavorite) {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/pets/${user.userId}`,
          { data: { petId: id }, withCredentials: true }
        );
      } else {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/pets/${user.userId}`,
          { petId: id },
          { withCredentials: true }
        );
      }
      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Error updating favorites:", error);
      alert("Failed to update favorites. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pet) return <div>Pet not found</div>;

  const openPopup = () => setIsPopupOpen(true); //Inna: I added this line
  const closePopup = () => setIsPopupOpen(false); //Inna: I added this line

  return (
    <div className="flex w-full my-[10rem] px-[4rem] py-10 mx-auto gap-[15rem]">
      <div className="petImages w-[40%]">
        <figure className="w-full">
          <img src={curImage} alt="dog" className="w-full rounded-[5rem]" />
        </figure>
        <div className="flex justify-between w-full">
          {images.map((img) => (
            <img
              src={img}
              alt={pet.name}
              key={img}
              className="w-[10rem] h-[10rem] mt-[8rem] rounded-[1.5rem]"
              onClick={(e) => handleCurImage(e.target)}
            />
          ))}
        </div>
      </div>
      <div className="dogInfo flex flex-col justify-between w-[40%]  ">
        <div className="flex flex-col gap-[1rem] ">
          <h2 className="text-[4rem] font-bold">{pet.name}</h2>
          <p className="text-[2rem]">{pet.breed}</p>
          <p className="text-[2rem]">
            {pet.gender}.{calculateAge(pet.age)}.{pet.size}
          </p>
          <p className="text-[2rem]">{pet.location}</p>
        </div>
        <div className="w-full h-[1px] bg-slate-700"></div>
        <div className="flex flex-col gap-[1rem]">
          <h3 className="text-[2rem] font-bold uppercase">About Me</h3>
          <div className="text-[2rem] flex flex-col gap-[1rem]">
            <p className="flex gap-[5rem]">
              <span>{pet.vaccinated ? "✔️ Vaccinated" : "❌ Vaccinated"}</span>
              <span>{pet.neutured ? "✔️ Neutured" : "❌ Neutuered"}</span>
            </p>
            <p className="flex gap-[6.7rem]">
              <span>{pet.microchipped ? "✔️ Microchip" : "❌ Microchip"}</span>
              <span>
                {pet.sociableWithOtherPets
                  ? "✔️ Friendly with other pets"
                  : "❌ Friendly with other pets"}
              </span>
            </p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-slate-700"></div>
        <div className="dogStory">
          <h3 className="text-[2rem] font-bold uppercase">My Story</h3>
          <p className="text-justify text-[1.6rem]">
            {pet.petStory.split("<br/>")[0]} <br />{" "}
            {pet.petStory.split("<br/>")[1]}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
          onClick={openPopup}
            className="bg-dark text-white text-[14px] w-full max-w-[150px] py-4 
                    font-medium rounded-full hover:bg-[#8D9F19] transition"
          >
            Adopt me
          </button>
          <div
            onClick={handleFavoriteClick}
            className={`w-16 h-16 flex items-center justify-center rounded-full transition 
                ${
                  isFavorite
                    ? "bg-dark"
                    : "border border-dark group hover:bg-dark"
                }`}
          >
            <img
              src="/images/favorites.svg"
              alt="Favorite"
              className={`w-8 h-8 transition 
                  ${isFavorite ? "invert" : "group-hover:invert"}`}
            />
          </div>
        </div>
      </div>
      {isPopupOpen && <ApplicationPopup pet={pet} onClose={closePopup} />} {/*Inna: I added this line*/}
    </div>
  );
}

export default Pet;
