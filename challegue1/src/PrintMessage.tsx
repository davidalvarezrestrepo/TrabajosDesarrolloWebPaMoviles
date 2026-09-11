interface Props {// es una propiedad de typescript que define la forma  que debe tener un objeto 
    message: string; //--> qué propiedades tiene y de qué tipo?
}
function PrintMessage({message}: Props) {
    return (<>
        <h3> { message }</h3>
    </>);
}

export default PrintMessage;
