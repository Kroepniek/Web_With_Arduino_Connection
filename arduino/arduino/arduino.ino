int r = 11;
int g = 10;
int b = 9;

String inputString = "";

void setup()
{
  Serial.begin(9600);
  
  pinMode(r, OUTPUT);
  pinMode(g, OUTPUT);
  pinMode(b, OUTPUT);
}

void loop()
{

}

void serialEvent()
{  
  while (Serial.available())
  {
    char inChar = (char)Serial.read();

    if (inChar == '\n')
    {
      doSomething(inputString);
      inputString = "";
    }
    else
    {
      inputString += inChar;
    }
  }
}

void doSomething(String data)
{
  byte red =    inputString.substring(0, inputString.indexOf(';')).toInt();
  byte green =  inputString.substring(inputString.indexOf(';') + 1, inputString.lastIndexOf(';')).toInt();
  byte blue =   inputString.substring(inputString.lastIndexOf(';') + 1).toInt();

  Serial.println(String(red) + ":" + String(green) + ":" + String(blue));

  analogWrite(r, red);
  analogWrite(g, green);
  analogWrite(b, blue);
}

