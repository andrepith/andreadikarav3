import { useSelector } from "react-redux";
import { IRootState } from "src/store/reducers";

const SocialForm = () => {
  const bio = useSelector((state: IRootState) => state.bio.bio);
  return (
    <section>
      <div className="social container">
        <div className="bio-section-title">Socials</div>
        <div className="social-items">
          {bio?.social.map(
            (soc: { _id: string; name: string; url: string }) => (
              <div className="social-item" key={soc._id}>
                <div>
                  <i className={`fa fa-${soc.name.toLowerCase()}`}></i>
                  {soc.name}
                </div>
                <div className="btn-action">
                  <button className="btn-edit">Edit</button>
                  <button className="btn-delete">Delete</button>
                  <button className="btn-visit">
                    <a href={soc.url} target="__blank">
                      Visit
                    </a>
                  </button>
                </div>
              </div>
            )
          )}
          <button className="social-item">
            <i className="fa fa-plus" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialForm;
