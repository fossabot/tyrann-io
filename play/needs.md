Fields

general:
  initialValue
string: 
    + trim
    + require
    + min, max
    + regex
      + password
      + email
      + phone (nation...)
      + numeric
      + ascii
number:
    + min, max, integer, positive, non-negative