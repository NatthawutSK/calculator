import * as React from 'react';
import Button from './Button';
import {View, Text} from 'react-native';
import {Styles} from '@styles/GlobalStyles';
import {myColors} from '@styles/Colors';
import calculator, {initialState} from '@util/calculator';
import {useState} from 'react';

export default function MyKeyboard() {
  const [state, setState] = useState(initialState);

  const handleTap = (type: string, value?: any) => {
    setState(state => calculator(type, value, state));
  };

  const firstNumberDisplay = () => {
    if (state.currentValue !== null) {
      return (
        <Text
          style={
            state.currentValue < 99999
              ? [Styles.screenFirstNumber, {color: myColors.result}]
              : [
                  Styles.screenFirstNumber,
                  {fontSize: 50, color: myColors.result},
                ]
          }>
          {parseFloat(state.currentValue).toLocaleString()}
        </Text>
      );
    }
    if (state.currentValue && state.currentValue.length < 6) {
      return (
        <Text style={Styles.screenFirstNumber}>
          {parseFloat(state.currentValue).toLocaleString()}
        </Text>
      );
    }
    if (state.currentValue === '') {
      return <Text style={Styles.screenFirstNumber}>0</Text>;
    }
    if (state.currentValue.length > 5 && state.currentValue.length < 8) {
      return (
        <Text style={[Styles.screenFirstNumber, {fontSize: 70}]}>
          {parseFloat(state.currentValue).toLocaleString()}
        </Text>
      );
    }
    if (state.currentValue.length > 7) {
      return (
        <Text style={[Styles.screenFirstNumber, {fontSize: 50}]}>
          {parseFloat(state.currentValue).toLocaleString()}
        </Text>
      );
    }
  };

  return (
    <View style={Styles.viewBottom}>
      <View
        style={{
          height: 120,
          width: '90%',
          justifyContent: 'flex-end',
          alignSelf: 'center',
        }}>
        <Text style={Styles.screenSecondNumber}>
          {state.previousValue === null
            ? parseFloat(state.currentValue).toLocaleString()
            : parseFloat(state.previousValue).toLocaleString()}

          <Text style={{color: 'purple', fontSize: 50, fontWeight: '500'}}>
            {state.operator}
          </Text>
          <Text>
            {state.operator !== null && state.currentValue > 0
              ? parseFloat(state.currentValue).toLocaleString()
              : null}

            {state.currentValue < 0 && state.operator !== null
              ? '(' + parseFloat(state.currentValue).toLocaleString() + ')'
              : null}
          </Text>
        </Text>
        {firstNumberDisplay()}
      </View>
      <View style={Styles.row}>
        <Button title="C" isGray onPress={() => handleTap('clear')} />
        <Button title="+/-" isGray onPress={() => handleTap('posneg')} />
        <Button title="％" isGray onPress={() => handleTap('percentage')} />
        <Button title="÷" isBlue onPress={() => handleTap('operator', '/')} />
      </View>
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleTap('number', 7)} />
        <Button title="8" onPress={() => handleTap('number', 8)} />
        <Button title="9" onPress={() => handleTap('number', 9)} />
        <Button title="×" isBlue onPress={() => handleTap('operator', '*')} />
      </View>
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleTap('number', 4)} />
        <Button title="5" onPress={() => handleTap('number', 5)} />
        <Button title="6" onPress={() => handleTap('number', 6)} />
        <Button title="-" isBlue onPress={() => handleTap('operator', '-')} />
      </View>
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleTap('number', 1)} />
        <Button title="2" onPress={() => handleTap('number', 2)} />
        <Button title="3" onPress={() => handleTap('number', 3)} />
        <Button title="+" isBlue onPress={() => handleTap('operator', '+')} />
      </View>
      <View style={Styles.row}>
        <Button title="." onPress={() => handleTap('number', '.')} />
        <Button title="0" onPress={() => handleTap('number', 0)} />
        <Button title="⌫" onPress={() => handleTap('del')} />
        <Button title="=" isBlue onPress={() => handleTap('equal')} />
      </View>
    </View>
  );
}
