import {StyleSheet} from 'react-native';

const textColor = 'black';
const bgColor = 'rgba(239,239,239,0.9)';
const red = 'red';

export default StyleSheet.create({
  //dark
  parent: {
    height: '100%',
    width: '100%',
    backgroundColor: bgColor,
    padding: 18,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: textColor,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  card2: {
    backgroundColor: 'white',
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  subText: {
    fontSize: 16,
    color: textColor,
    margin: 16,
  },
  btnAllign: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    height: 40,
    width: 40,
    marginRight: 20,
  },
  floatingBtn: {
    backgroundColor: red,
    height: 60,
    width: 60,
    borderRadius: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: 70,
    marginRight: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerBtn: {
    height: 120,
    width: 120,
    marginRight: 30,
    marginBottom: -20,
  },
  centerBtnTxt: {
    color: textColor,
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 20,
  },
  btnBack: {
    height: 20,
    width: 20,
    marginRight: 20,
  },
  navBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput: {
    marginBottom: 20,
    backgroundColor: 'rgba(239,239,239,1)',
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: red,
    height: 50,
    width: '100%',
    borderRadius: 0,
    marginTop: 10,
  },
  btn: {
    backgroundColor: red,
    fontSize: 18,
    color: 'white',
  },
  radio: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'black',
    height: 15,
    width: 15,
    marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'black',
    height: 10,
    width: 10,
    backgroundColor: 'black',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnSelect: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 20,
    overflow: 'hidden',
    elevation: 1,
    borderRadius: 12,
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20,
  },
});
