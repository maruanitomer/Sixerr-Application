import React from 'react'
import ContentEditable from 'react-contenteditable'
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

export class EditableElement extends React.Component {
    state = {
        editable: false,
        html: this.props.text
    }
    contentEditable = React.createRef();

    componentDidMount() {
    }

    handleChange = evt => {
        this.setState({ ...this.state, html: evt.target.value });
    };

    toggleEditable = () => {
        this.setState({
            ...this.state, editable: !this.state.editable
        },
            () => {
                if (this.state.editable) this.contentEditable.current.focus()
            })
    }

    onStartEdit = () => {
        this.toggleEditable()
    }

    onSaveElement = () => {
        this.props.save(this.props.field, this.contentEditable.current.innerText)
        this.toggleEditable()
    }

    render = () => {
        const { editable } = this.state
        const editableStyle = (editable) ? { border: '1px solid #888' } : {}
        return (
            <div className="content-edit-wrapper flex align-center">
                <ContentEditable
                    innerRef={this.contentEditable}
                    html={this.state.html} // innerHTML of the editable div
                    disabled={!this.state.editable}       // use true to disable editing
                    onChange={this.handleChange} // handle innerHTML change
                    tagName={this.props.type} // Use a custom HTML tag (uses a div by default)
                    className="content-editable"
                    style={editableStyle}
                />
                <div className="action-buttons">
                    {!editable && <EditIcon className="action-button" onClick={this.onStartEdit} />}
                    {editable && <DoneIcon className="action-button" onClick={this.onSaveElement} />}
                </div>
            </div>
        )
    }
}