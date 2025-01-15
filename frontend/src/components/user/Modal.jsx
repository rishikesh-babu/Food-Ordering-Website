function ProfileModal({ image }) {
    return (
        <dialog id="profile_modal" className="modal">
            <div className="modal-box p-0 size-fit">
                <img src={image} alt="Profile Pic" />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export { ProfileModal };
