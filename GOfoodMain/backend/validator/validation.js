
  const validator = 
{
  password:
  {
    isLength:
    {
        options:
        {
            max:20,
            min:6
        }
        ,errorMessage: 'Password should be at least 6-20 chars long'
    }

  },
  email:
  {
    isEmail:
    {
        errorMessage:'Must be Email'
    }
  }
}

module.exports=validator;