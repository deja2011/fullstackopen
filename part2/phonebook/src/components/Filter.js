const Filter = (props) =>
    <form>
        <div>
            <input value={props.pattern} onChange={props.handlePatternChange} />
        </div>
    </form>

export default Filter
