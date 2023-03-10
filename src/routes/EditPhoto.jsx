import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const editPhoto = (e) => {
    e.preventDefault();
    let data = {
      imageUrl: imageUrl,
      captions: captions,
      updatedAt: new Date()
    }
    console.log(JSON.stringify(data))
    fetch(` https://gallery-app-server.vercel.app/photos/${id}`, {
      method: "PATCH",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(data),
    })
    .then(el => el.json())
    .then(elHasil => {
      console.log(elHasil)
      navigate("/photos")})
  };

  useEffect(() => {
    setLoading(true);
    fetch(` https://gallery-app-server.vercel.app/photos/${id}`)
    .then(hasil => hasil.json())
    .then(lastHasil => {
      setImageUrl(lastHasil.imageUrl)
      setCaptions(lastHasil.captions)
    })
    setLoading(false)
  }, [id]);

  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
          Loading...
        </h1>
      ) : (
        <div className="container">
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input
                className="edit-input"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <label>
              Captions:
              <input
                className="edit-input"
                type="text"
                value={captions}
                data-testid="captions"
                onChange={(e) => setCaptions(e.target.value)}
              />
            </label>
            <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
          </form>
        </div>
      )}
    </>
  );
};

export default EditPhoto;
