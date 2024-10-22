import './NotFound.css';

function NotFound() {
    return(
        <div className='not-found container'>
            <p className='not-found code main-color'>404</p>
            <p className='not-found message main-color'>Oups! La page que vous avez demandez n'existe pas</p>
        </div>
    )
}

export default NotFound;