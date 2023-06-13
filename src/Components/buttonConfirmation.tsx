import { FaTimesCircle } from "react-icons/fa"

export const ButtonConfirmation = ({showDeleteModal,setShowDeleteModal,movieToDelete,handleDelete}:any) => {

    return (
        <div className="modal modal-background" style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-dialog-centered animate__animated animate__zoomIn" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete movie</h5>
                        <button className='blank-button' onClick={() => setShowDeleteModal(false)}><FaTimesCircle className='icon-style' /></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete the movie "{movieToDelete.title}"?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </button>
                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(movieToDelete.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
