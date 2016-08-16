using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication2.Models
{
     public class Person
     {
          private string name { get; set; }
          private string date { get; set; }

          public Person()
          {
               name = "";
               date = "";
          }

          public Person(string name, string date)
          {
               this.name = name;
               this.date = date;
          }
     }
}
