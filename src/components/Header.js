import Button from './Button'

const Header = ({ title, age, onAdd, showAdd }) => {
    return (
        <header className='header'>
            {/* <h1 style={{ color: 'red' }}>{title} {age}</h1> */}
            <h1>{title}</h1>
            <Button onAdd={onAdd} color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'}></Button>
        </header>
    )
}

// -- If there is no props that pass this is will be the default -- //
// Header.defaultProps = {
//     title: 'Task Tracker'
// }


// -- This will set the prop type -- //
// import PropTypes from 'prop-types'
// Header.prototype = {
//     title: PropTypes.string.isRequired
// }

export default Header
