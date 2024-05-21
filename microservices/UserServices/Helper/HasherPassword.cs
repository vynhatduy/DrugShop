using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace UserServices.Helper
{
    public class HasherPassword
    {
        public static Dictionary<string, string> HashPass(string pass)
        {
            Dictionary<string, string> result = new Dictionary<string, string>();
            try
            {
                byte[] salt = RandomNumberGenerator.GetBytes(128 / 8);
                string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: pass.Trim().ToString(),
                    salt: salt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 1000,
                    numBytesRequested: 256 / 8));
                result.Add("password", hashed);
                result.Add("salt", Convert.ToBase64String(salt));
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return null;
            }
        }
        public static string CheckHashPass(string pass, string salt)
        {
            try
            {
                string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: pass,
                    salt: Convert.FromBase64String(salt),
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 1000,
                    numBytesRequested: 256 / 8));
                return hashed;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return null;
            }
        }
    }
}
