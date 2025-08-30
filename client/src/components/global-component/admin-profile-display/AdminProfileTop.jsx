import { reviewPic } from "../../../constants";

function AdminProfileTop() {
  return (
    <div className="flex border border-black items-center rounded-full self-start cursor-pointer absolute left-0 top-0 my-8 mb-4 ml-[30px] ">
      <img
        src={reviewPic.profil5}
        className="w-fit h-fit  "
        alt="profile"
      />
    </div>
  );
}

export default AdminProfileTop;
