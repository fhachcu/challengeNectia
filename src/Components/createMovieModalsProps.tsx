import {CreateMovieModalProps} from '../Interfaces/interfaces';

export const CreateMovieModal = ({ show, onClose, onCreate, movie, setMovie }: CreateMovieModalProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setMovie({ ...movie, [name]: value });
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onCreate(movie);
    };
  
    return (
      <div className="modal" style={{ display: show ? 'block' : 'none' }} tabIndex={-1} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create new movie</h5>
              <button type="button" className="close" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Title:</label>
                  <input type="text" name="title" value={movie.title} onChange={handleChange} className="form-control" pattern="[a-zA-Z0-9\s]+" required/>
                </div>
                <div className="form-group">
                  <label>genere:</label>
                  <input type="text" name="genere" value={movie.genere} onChange={handleChange} className="form-control" pattern="[a-zA-Z0-9\s]+" required/>
                </div>
                <div className="form-group">
                  <label>Year:</label>
                  <input type="number" name="year" value={movie.year} onChange={handleChange} className="form-control" pattern="[0-9]+"/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };