import {Component} from 'react'
import {v4} from 'uuid'

import {
  MainBgContainer,
  BgContainer,
  FormContainer,
  FormHeading,
  LabelAndInput,
  Label,
  Input,
  SelectInput,
  FormButton,
  OptionInput,
  TagsContainer,
  MainHeading,
  TagsListContainer,
  TagListItem,
  TagButton,
  TaskUl,
  NoTaskText,
  TaskListLi,
  TaskText,
  TaskTag,
} from './styledComponents'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    inputText: '',
    inputTag: tagsList[0].optionId,
    taskList: [],
    activeTag: 'INITIAL',
  }

  changeInput = event => {
    this.setState({inputText: event.target.value})
  }

  onChangeTag = event => {
    this.setState({inputTag: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const {inputText, inputTag} = this.state
    const newTask = {
      id: v4(),
      task: inputText,
      tag: inputTag,
    }
    if (inputText.length !== 0) {
      this.setState(prevState => ({
        taskList: [...prevState.taskList, newTask],
        inputText: '',
        inputTag: '',
      }))
    }
  }

  onClickActiveTag = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  renderCreateTaskView = () => {
    const {inputText, inputTag} = this.state
    return (
      <BgContainer>
        <FormContainer onSubmit={this.submitForm}>
          <FormHeading>Create a task!</FormHeading>
          <LabelAndInput>
            <Label htmlFor="inputText">Task</Label>
            <Input
              type="text"
              placeholder="Enter the task here"
              onChange={this.changeInput}
              value={inputText}
              id="inputText"
            />
          </LabelAndInput>
          <LabelAndInput>
            <Label htmlFor="selectTag">Tags</Label>
            <SelectInput
              onChange={this.onChangeTag}
              value={inputTag}
              id="selectTag"
            >
              {tagsList.map(each => (
                <OptionInput value={each.optionId} key={each.optionId}>
                  {each.displayText}
                </OptionInput>
              ))}
            </SelectInput>
          </LabelAndInput>
          <FormButton type="submit">Add Task</FormButton>
        </FormContainer>
      </BgContainer>
    )
  }

  renderTaskCard = () => {
    const {taskList, activeTag} = this.state
    const filterTaskList =
      activeTag === 'INITIAL'
        ? taskList
        : taskList.filter(each => each.tag === activeTag)
    return (
      <>
        {filterTaskList.map(each => (
          <TaskListLi key={each.id}>
            <TaskText>{each.task}</TaskText>
            <TaskTag>{each.tag}</TaskTag>
          </TaskListLi>
        ))}
      </>
    )
  }

  renderAddTaskView = () => {
    const {taskList, activeTag} = this.state

    return (
      <TagsContainer>
        <MainHeading>Tags</MainHeading>
        <TagsListContainer>
          {tagsList.map(each => {
            const isActive = activeTag === each.optionId
            return (
              <TagListItem key={each.optionId}>
                <TagButton
                  type="button"
                  value={each.optionId}
                  onClick={this.onClickActiveTag}
                  isActive={isActive}
                >
                  {each.displayText}
                </TagButton>
              </TagListItem>
            )
          })}
        </TagsListContainer>
        <MainHeading>Tasks</MainHeading>
        <TaskUl>
          {taskList.length === 0 ? (
            <NoTaskText>No Tasks Added Yet</NoTaskText>
          ) : (
            this.renderTaskCard()
          )}
        </TaskUl>
      </TagsContainer>
    )
  }

  render() {
    return (
      <MainBgContainer>
        {this.renderCreateTaskView()}
        {this.renderAddTaskView()}
      </MainBgContainer>
    )
  }
}

export default App
