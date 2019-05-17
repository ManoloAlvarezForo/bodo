import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import ReactDOM from 'react-dom';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import FormHelperText from '@material-ui/core/FormHelperText';
import Avatar from '@material-ui/core/Avatar';
//Icons
import { FiPlus, FiX, FiPhone, FiMail, FiUsers, FiAward, FiMapPin } from 'react-icons/fi';
// GraphQL
import { Query, Mutation } from "react-apollo";
import { GET_APPLICANT_BY_ID, GET_APPLICANTS_BASIC } from './ApplicantsQueries';
import { UPDATE_APPLICANT, ADD_APPLICANT } from './ApplicantsMutations';
//Validations
import { compose, emptyTextValidator, emailValidator } from '../../Utils/Validations'

const FIELD_WIDTH = '250px';
const FIELD_WIDTH_X2 = '505px';

const fieldWithValidation = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: false,
        errorMessage: ""
      }
    }

    componentDidMount() {
      this._executeValidation(this.props.value);
    }

    _executeValidation = (value) => {
      if (this.props.validator) {
        const resValidator = this.props.validator({ text: value, errorMessage: '', error: false });
        const propertyName = `${this.props.property}Error`
        this.props.setValues({ [propertyName]: resValidator.error })
        this.props.evaluateErrorInData();

        this.setState({
          error: resValidator.error,
          errorMessage: resValidator.errorMessage
        })
      }
    }

    _onChangeLocal = (e) => {
      this._executeValidation(e.target.value)

      if (this.props.handleChange) {
        this.props.handleChange(e)
      }
    }

    render() {
      return <WrappedComponent onChange={this._onChangeLocal} error={this.state.error} errorMessage={this.state.errorMessage} {...this.props} />;
    }
  }
}

class TextFielWithValidation extends React.Component {
  render() {
    const { value, label, name, styles, error, errorMessage, onChange, isRequired } = this.props

    return (
      <TextField style={styles}
        value={value}
        onChange={(e) => onChange(e)}
        label={label}
        name={name}
        variant="outlined"
        error={error}
        helperText={error && (errorMessage)}
        required={isRequired}
      />
    )
  }
}

const ApplicantTextFieldWithValidation = fieldWithValidation(TextFielWithValidation);

class ApplicantFullName extends React.Component {
  render() {
    const { name, lastName, avatar, handleChange, setValues, validator, evaluateErrorInData } = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: '6px', marginBottom: '7px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {
            avatar.length === 1 ?
              <Avatar style={{ margin: '0 8px', width: 60, height: 60 }}>{avatar}</Avatar> :
              <Avatar src={avatar} style={{ margin: '0 8px', width: 60, height: 60 }}></Avatar>
          }
        </div>
        <ApplicantTextFieldWithValidation styles={{ marginTop: '4px', marginLeft: '5px', marginRight: '5px', width: FIELD_WIDTH, display: 'flex' }}
          validator={validator}
          handleChange={handleChange}
          value={name}
          label="Name"
          property="name"
          name="name"
          setValues={setValues}
          evaluateErrorInData={evaluateErrorInData}
          isRequired
        />
        <ApplicantTextFieldWithValidation styles={{ marginTop: '4px', marginRight: '5px', width: FIELD_WIDTH, display: 'flex' }}
          validator={validator}
          handleChange={handleChange}
          value={lastName}
          label="Last Name"
          name="lastName"
          property="lastName"
          variant="outlined"
          setValues={setValues}
          evaluateErrorInData={evaluateErrorInData}
          isRequired
        />
      </div>
    )
  }
}

class ApplicantListField extends React.Component {
  state = {
    value: this.props.value,
    label: this.props.label,
    menuList: this.props.menuList,
    labelWidth: 0,
    item: this.props.item,
    pressNewItem: false,
    listName: this.props.listName,
    keyWord: this.props.keyWord,
    currentIndex: this.props.index,
    isError: false,
  }

  componentDidMount() {
    this._setLabelWidth();
  }

  static getDerivedStateFromProps(props) {
    return (props.isNewItem !== undefined && props.item.isNewItem === true) ? { value: '', label: '' } : null;
  }

  _setLabelWidth = () => {
    const labelNode = ReactDOM.findDOMNode(this.InputLabelRef);
    if (labelNode)
      this.setState({
        labelWidth: labelNode.offsetWidth,
      });
  }

  _handleChange = event => {
    this._setLabelWidth();
    let newItem = this.props.item;
    this.setState({ [event.target.name]: event.target.value, isError: true }, () => {
      newItem[this.state.keyWord] = this.state.value;
      newItem.label = this.state.label;
      this.props.updateListItem(newItem, this.state.currentIndex, this.state.listName)
    });
  }

  _capitalizeWord = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  _removeItem = () => {
    this.props.removeFromList(this.state.listName, this.state.currentIndex, this.props.isTheLastItem)
  }

  _addNewItem = () => {
    this.props.addToList(this.state.listName)
  }

  render() {

    const {
      isTheLastItem,
      validator,
      keyWord,
      setValues,
      listName,
      evaluateErrorInData,
      isRequired,
      firstByDefault
    } = this.props

    const { value } = this.state;

    return (
      <div style={{ display: 'flex', flexDirection: 'row', margin: '7px 0' }}>
        <ApplicantTextFieldWithValidation styles={{ width: value === "" ? FIELD_WIDTH_X2 : FIELD_WIDTH, marginRight: '5px' }}
          validator={validator}
          value={this.state.value}
          handleChange={this._handleChange}
          label={this._capitalizeWord(keyWord)}
          variant="outlined"
          keyWord={keyWord}
          name="value"
          setValues={setValues}
          property={listName}
          evaluateErrorInData={evaluateErrorInData}
          isRequired={isRequired}
        />
        {
          value !== "" && (<React.Fragment>
            <SelectFieldWithValidation styles={{ width: FIELD_WIDTH, marginRight: '5px' }}
              value={this.state.label}
              property="label"
              handleChange={(e) => this._handleChange(e)}
              menuList={this.state.menuList}
              firstByDefault={firstByDefault}
            />
          </React.Fragment>)
        }
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {
            value !== "" && (<FiX
              color="#afafaf"
              className="detail-button"
              style={{ backgroundColor: '#757575', margin: '0 5px', fontSize: '22px' }}
              onClick={this._removeItem}
            />)
          }
          {
            (isTheLastItem && value !== "") && (<FiPlus
              className="detail-button"
              style={{ backgroundColor: '#757575', margin: '0 5px', fontSize: '22px' }}
              color="#afafaf"
              onClick={this._addNewItem}
            />)
          }
        </div>
      </div>
    )
  }
}

const ApplicantList = ({
  list,
  addToList,
  removeFromList,
  updateListItem,
  keyWord,
  menuList,
  icon,
  listName,
  validator,
  setValues,
  evaluateErrorInData,
  isRequired,
  firstByDefault
}) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <div style={{ margin: '0 12px', display: 'flex', alignItems: 'flex-start' }}>
        {
          icon
        }
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {
          list.map((item, index) => {
            return (
              <ApplicantListField
                isTheLastItem={index + 1 === list.length}
                key={index}
                value={item[keyWord]}
                label={item.label === "" && firstByDefault === true ? menuList[0] : item.label}
                item={item}
                menuList={menuList}
                keyWord={keyWord}
                addToList={addToList}
                removeFromList={removeFromList}
                updateListItem={updateListItem}
                listName={listName}
                index={index}
                validator={validator}
                setValues={setValues}
                evaluateErrorInData={evaluateErrorInData}
                isRequired={isRequired}
                firstByDefault={firstByDefault}
              />
            )
          })
        }
      </div>
    </div>
  )
}

class SelectField extends React.Component {

  state = {
    labelWidth: 0,
  }

  componentDidMount() {
    this._setLabelWidth();
  }

  _capitalizeWord = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  _setLabelWidth = () => {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this[`Input${this.props.property}LabelRef`]).offsetWidth
    });
  }

  render() {
    const {
      styles,
      value,
      property,
      onChange,
      error,
      errorMessage,
      menuList,
      isRequired
    } = this.props;

    return (
      <FormControl variant="outlined" style={styles} error={error} required={isRequired}>
        <InputLabel
          ref={ref => {
            this[`Input${property}LabelRef`] = ref;
          }}
          htmlFor={`${property}_item`}
        >
          {this._capitalizeWord(property)}
        </InputLabel>
        <Select
          value={value}
          onChange={onChange}
          input={
            <OutlinedInput
              labelWidth={this.state.labelWidth}
              name={property}
              id={`${property}_item`}
              onChange={this._setLabelWidth}
            />
          }>
          {
            menuList.map((option, index) => {
              return (
                <MenuItem key={index} value={option}>{option}</MenuItem>
              )
            })
          }
        </Select>
        {
          (error) && (<FormHelperText>{errorMessage}</FormHelperText>)
        }
      </FormControl>
    )
  }
}

const SelectFieldWithValidation = fieldWithValidation(SelectField);

class ApplicantSelectField extends React.Component {

  state = {
    menuList: this.props.menuList,
  }

  render() {
    const { icon, setValues, handleChange, value, validator, evaluateErrorInData, isRequired } = this.props
    return (
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ margin: '0 12px', display: 'flex', alignItems: 'flex-start' }}>
          {
            icon
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <SelectFieldWithValidation styles={{ width: FIELD_WIDTH_X2, margin: '7px 0' }}
            value={value}
            property={this.props.property}
            handleChange={handleChange}
            menuList={this.state.menuList}
            validator={validator}
            setValues={setValues}
            evaluateErrorInData={evaluateErrorInData}
            isRequired={isRequired}
          />
        </div>
      </div>
    )
  }
}

class ApplincantTextField extends React.Component {

  _capitalizeWord = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  render() {
    const { icon, name, handleChange, text, setValues, validator, evaluateErrorInData } = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ margin: '0 12px', display: 'flex', alignItems: 'flex-start' }}>
          {
            icon
          }
        </div>
        <ApplicantTextFieldWithValidation
          styles={{ width: FIELD_WIDTH_X2, margin: '7px 0' }}
          value={text}
          handleChange={handleChange}
          label={this._capitalizeWord(name)}
          name={name}
          variant="outlined"
          validator={validator}
          setValues={setValues}
          evaluateErrorInData={evaluateErrorInData}
        />
      </div>
    )
  }
}

class ApplicantContent extends React.Component {
  state = {
    id: this.props.applicant.id,
    name: this.props.applicant.name,
    nameError: false,
    lastName: this.props.applicant.lastName,
    lastNameError: false,
    avatar: this.props.applicant.avatar,
    phones: {
      list: this.props.applicant.phones.list,
      keyName: this.props.applicant.phones.keyName
    },
    phonesError: false,
    mails: {
      list: this.props.applicant.mails.list,
      keyName: this.props.applicant.mails.keyName
    },
    mailsError: false,
    accounts: {
      list: this.props.applicant.accounts.list,
      keyName: this.props.applicant.accounts.keyName
    },
    accountsError: false,
    position: this.props.applicant.position,
    positionError: false,
    address: this.props.applicant.address,
    addressError: false,
    phoneMenuList: ['Mobil', 'Home', 'Job', 'Other'],
    mailMenuList: ['Personal', 'Home', 'Job', 'Other'],
    accountMenuList: ['Skype', 'Whatsapp', 'Facebook', 'Instagram', 'Other'],
    positionMenuList: ['Developer', 'QA', 'QA/Automation', 'Automation', 'Dev Ops'],
    errorInData: false,
    hasChanges: false,
    realPhones: {
      list: [],
    },
    realMails: {
      list: []
    },
    realAccounts: {
      list: []
    }
  }

  componentDidMount() {
    this.props.applicant.phones.list.length === 0 && this.setState({
      phones: {
        list: this.state.phones.list.concat([this._createNewItemFactory('phones')]),
      }
    })

    this.props.applicant.mails.list.length === 0 && this.setState({
      mails: {
        list: this.state.mails.list.concat([this._createNewItemFactory('mails')]),
      }
    })

    this.props.applicant.accounts.list.length === 0 && this.setState({
      accounts: {
        list: this.state.accounts.list.concat([this._createNewItemFactory('accounts')]),
      }
    })
  }

  _evaluateErrorInData = () => {
    const error = (this.state.nameError === false &&
      this.state.lastNameError === false &&
      this.state.mailsError === false &&
      this.state.phonesError === false &&
      this.state.accountsError === false &&
      this.state.addressError === false) ? false : true;
    this.setState({
      errorInData: error
    })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, hasChanges: true });
  };

  setValues = (values) => {
    this.setState(values);
  }

  _save = () => {
    this.props.closeDialog();
  }

  _confirmSaveData = data => {
    if (data) {
      if (data.updateApplicant) {
        this.props.setSnackBar('success', 'snackBarUpdatedMessage')
      }

      if (data.addApplicant) {
        this.props.setSnackBar('success', 'snackBarAddedMessage')

      }
      this.props.setValue('snackBar', true);
    }
    this.props.closeDialog();
  }

  _updateListItemByIndex = (itemNew, indexFromOld, listName) => {
    this.setState({
      [listName]: {
        list: this.state[listName].list.map((item, index) => {
          return (index === indexFromOld) ? itemNew : item;
        })
      }
      , hasChanges: true
    })
  }

  _removeFromListByIndex = (listName, indexToItemToRemove, isTheLastItem) => {
    const newList = this.state[listName].list.filter((_, index) => index !== indexToItemToRemove);

    this.setState({
      [listName]: { list: newList }
      , hasChanges: true
    }, () => {
      if (this.state[listName].list.length === 0) {
        this._addToList(listName)
      }
    })
  }

  _createNewItemFactory = (listName) => {
    let newItem = {};
    switch (listName) {
      case 'phones': newItem = { number: '', label: '' }
        break;
      case 'mails': newItem = { mail: '', label: '' }
        break;
      case 'accounts': newItem = { account: '', label: '' }
        break;
      default:
        break;
    }

    return newItem;
  }

  _addToList = (listName) => {
    const newList = this.state[listName].list.concat(this._createNewItemFactory(listName));
    this.setState({
      [listName]: { list: newList }
      , hasChanges: true
    })
  }

  _cleanDataModel = async () => {
    if (this.state.phones.list.length >= 1 && (this.state.phones.list[0].number !== "" && this.state.phones.list[0].label !== "")) {
      await this.setState({
        realPhones: this.state.phones
      })
    } else {
      await this.setState({
        realPhones: []
      })
    }

    if (this.state.mails.list.length >= 1 && (this.state.mails.list[0].mail !== "" && this.state.mails.list[0].label !== "")) {
      await this.setState({
        realMails: this.state.mails
      })
    } else {
      await this.setState({
        realMails: []
      })
    }

    if (this.state.accounts.list.length >= 1 && (this.state.accounts.list[0].account !== "" && this.state.accounts.list[0].label !== "")) {
      await this.setState({
        realAccounts: this.state.accounts
      })
    } else {
      await this.setState({
        realAccounts: []
      })
    }
  }


  _mutationSave = async (mutationFn) => {
    await this._cleanDataModel();
    await mutationFn();
  }

  render() {

    const { name, lastName, avatar, errorInData, id } = this.state;

    return (
      <React.Fragment>
        <DialogContent>
          <ApplicantFullName
            name={name}
            lastName={lastName}
            avatar={avatar === "" ? ((!this.props.applicant.name) ? "D" : this.props.applicant.name[0]) : avatar}
            handleChange={this.handleChange}
            setValues={this.setValues}
            validator={compose(emptyTextValidator)}
            evaluateErrorInData={this._evaluateErrorInData}
          />
          <div style={{ marginLeft: '34px' }}>
            <ApplicantList
              list={this.state.phones.list}
              addToList={this._addToList}
              removeFromList={this._removeFromListByIndex}
              updateListItem={this._updateListItemByIndex}
              keyWord={this.props.applicant.phones.keyName}
              menuList={this.state.phoneMenuList}
              icon={<FiPhone style={styles.iconToField} />}
              listName={"phones"}
              // validator={compose(emptyTextValidator)}
              setValues={this.setValues}
              evaluateErrorInData={this._evaluateErrorInData}
              isRequired={false}
              firstByDefault
            />
            <ApplicantList
              list={this.state.mails.list}
              addToList={this._addToList}
              removeFromList={this._removeFromListByIndex}
              updateListItem={this._updateListItemByIndex}
              keyWord={this.props.applicant.mails.keyName}
              menuList={this.state.mailMenuList}
              icon={<FiMail style={styles.iconToField} />}
              listName={"mails"}
              validator={compose(emailValidator)}
              setValues={this.setValues}
              evaluateErrorInData={this._evaluateErrorInData}
              isRequired={false}
              firstByDefault
            />
            <ApplicantList
              list={this.state.accounts.list}
              addToList={this._addToList}
              removeFromList={this._removeFromListByIndex}
              updateListItem={this._updateListItemByIndex}
              keyWord={this.props.applicant.accounts.keyName}
              menuList={this.state.accountMenuList}
              icon={<FiUsers style={styles.iconToField} />}
              listName={"accounts"}
              // validator={compose(emptyTextValidator)}
              setValues={this.setValues}
              evaluateErrorInData={this._evaluateErrorInData}
              firstByDefault
            />
            <ApplicantSelectField
              icon={<FiAward style={styles.iconToField} />}
              menuList={this.state.positionMenuList}
              value={this.state.position}
              property="position"
              handleChange={(e) => this.handleChange(e)}
              setValues={this.setValues}
              validator={compose(emptyTextValidator)}
              evaluateErrorInData={this._evaluateErrorInData}
              isRequired
            />
            <ApplincantTextField
              icon={<FiMapPin style={styles.iconToField} />}
              text={this.state.address}
              name='address'
              property='address'
              handleChange={this.handleChange}
              setValues={this.setValues}
              evaluateErrorInData={this._evaluateErrorInData}
            // validator={compose(emptyTextValidator)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={this.props.closeDialog}>
            Cancel
          </Button>

          <Mutation
            mutation={this.state.id !== undefined ? UPDATE_APPLICANT : ADD_APPLICANT}
            variables={this.state.id !== undefined ? {
              applicantToUpdate: {
                id: this.state.id,
                name: this.state.name,
                lastName: this.state.lastName,
                avatar: this.state.avatar,
                phones: this.state.realPhones,
                mails: this.state.realMails,
                accounts: this.state.realAccounts,
                position: this.state.position,
                address: this.state.address,
              }
            } :
              {
                applicant: {
                  name: this.state.name,
                  lastName: this.state.lastName,
                  avatar: this.state.avatar,
                  phones: this.state.realPhones,
                  mails: this.state.realMails,
                  accounts: this.state.realAccounts,
                  position: this.state.position,
                  address: this.state.address,
                }
              }
            }
            update={(cache, data) => {

              let applicant = (this.state.id !== undefined) ? data.data.updateApplicant.applicant : data.data.addApplicant;

              let { applicants } = cache.readQuery({ query: GET_APPLICANTS_BASIC });

              const newApplicants = (this.state.id !== undefined) ? applicants.map(a => {
                return (a.id === applicant.id) ? applicant : a
              }) :
                applicants.concat([applicant]);

              cache.writeQuery({
                query: GET_APPLICANTS_BASIC,
                data: {
                  applicants: newApplicants
                }
              });

              cache.writeQuery({
                query: GET_APPLICANT_BY_ID,
                variables: { id: this.state.id },
                data: {
                  applicantById: applicant
                }
              });
            }}

            onCompleted={data => this._confirmSaveData(data)}
          >
            {save => (
              id !== undefined ?
                <Button
                  disabled={errorInData || !this.state.hasChanges}
                  variant="contained"
                  color="secondary"
                  onClick={() => this._mutationSave(save)}>
                  Save
              </Button>
                :
                <Button
                  disabled={errorInData || !this.state.hasChanges}
                  variant="contained"
                  color="secondary"
                  onClick={() => this._mutationSave(save)}>
                  Add
              </Button>
            )}
          </Mutation>
        </DialogActions>
      </React.Fragment>
    )
  }
}

class NewApplicantDialog extends React.Component {

  render() {

    const { isEnabled, closeDialog, fullScreen, setValue, setSnackBar } = this.props;
    const newApplicant = {
      name: '',
      lastName: '',
      avatar: '',
      phones: { list: [{ number: '', label: '' }], keyName: 'number' },
      mails: { list: [{ mail: '', label: '' }], keyName: 'mail' },
      accounts: { list: [{ account: '', label: '' }], keyName: 'account' },
      position: '',
      address: '',
    }

    return (
      <Dialog
        fullScreen={fullScreen}
        // fullWidth={true}
        maxWidth={"md"}
        open={isEnabled || false}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Applicant</DialogTitle>
        <ApplicantContent
          applicant={newApplicant}
          closeDialog={closeDialog}
          setValue={setValue}
          setSnackBar={setSnackBar}
        />
      </Dialog>
    )
  }
}

class EditApplicantDialog extends React.Component {

  render() {

    const id = this.props.applicantSelectedId;
    const { isEnabled, closeDialog, fullScreen, setValue, setSnackBar } = this.props;

    return (
      <Query
        query={GET_APPLICANT_BY_ID}
        variables={{ id }}
        skip={id === ""}
        fetchPolicy="no-cache">
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>
          if (error) return `Error!: ${error}`

          return (
            data !== undefined && (
              <Dialog
                fullScreen={fullScreen}
                // fullWidth={true}
                maxWidth={"md"}
                open={isEnabled || false}
                onClose={closeDialog}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Edit Applicant</DialogTitle>
                <ApplicantContent applicant={data.applicantById} closeDialog={closeDialog} setValue={setValue} setSnackBar={setSnackBar} />
              </Dialog>
            )
          )
        }}
      </Query>
    )
  }
}

class ApplicantDialogContent extends React.Component {

  _closeDialog = () => {
    this.props.handleDialog('content', false);
    // this.props.clearApplicantSelectedId();
  }

  render() {
    const { fullScreen, setValue, setSnackBar, isNewApplicant } = this.props;
    const id = this.props.applicantSelectedId;
    return (
      <React.Fragment>
        {
          (isNewApplicant) ?
            <NewApplicantDialog
              fullScreen={fullScreen}
              closeDialog={this._closeDialog}
              isEnabled={this.props.isEnabled}
              setValue={setValue}
              setSnackBar={setSnackBar}
            />
            :
            <EditApplicantDialog
              applicantSelectedId={id}
              fullScreen={fullScreen}
              closeDialog={this._closeDialog}
              isEnabled={this.props.isEnabled}
              setValue={setValue}
              setSnackBar={setSnackBar}
            />
        }
      </React.Fragment>
    );
  }
}

const styles = {
  iconToField: {
    fontSize: '24px',
    color: 'gray',
    marginTop: '8px'
  }
}

export default withMobileDialog()(ApplicantDialogContent);