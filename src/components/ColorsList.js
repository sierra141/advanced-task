import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';


const ColorsList = ({ colors, buttonColor }) => {

    return (
        <DragDropContext onDragEnd={(param) =>{
            const srcIndex = param.source.index;
            const destIndex = param.destination?.index;

            colors.splice(destIndex, 0, colors.splice(srcIndex, 1)[0]);

        }}>
            <Droppable droppableId="colorList">
                {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef} style={{ listStyleType: "none" }}>
            {colors.map((color, index) => (
                <Draggable key={color.id_s} draggableId={color.id_s} index={index}>
                    {(provided) => (

                        <li id={color.id_s} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <h4 style={(color.hex !== buttonColor) ? {color: "#" + color.hex, fontWeight: "200"} : {color: "#" + color.hex ,fontWeight: "1000"}}>#{color.hex}</h4>
                        </li>
                        
                    )}
                </Draggable>
            ))}
            {provided.placeholder}
        </ul>
        )}
        </Droppable>
        </DragDropContext>
    )
}


export default ColorsList
