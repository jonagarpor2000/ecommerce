import emailService from "../service/emailService.js";
import { EError } from "../utils/errors/enums.js";
import { CustomError } from "../utils/errors/error.js";
import { generateProductError } from "../utils/errors/info.js";
import { logger } from "../utils/logger.js";



export class mailController {
    constructor() {
        this.mailservice = new emailService();
      }

      
       

/**
 * Sends an email with order details.
 *
 * @param {Object} req - The request object containing the necessary data for processing.
 * @param {Object} res - The response object to send the result back to the client.
 * @param {Object} data - The data object containing the order details and recipient's address.
 * @param {string} data.address - The email address of the recipient.
 * @param {Object} data.order - The order details.
 * @param {string} data.order.code - The unique identifier of the order.
 * @param {number} data.order.amount - The total amount of the order.
 * @param {Array} data.products - The array of products in the order.
 * @param {Object} data.products.element - An object representing a product in the order.
 * @param {string} data.products.product.title - The title of the product.
 * @param {number} data.products.product.price - The price of the product.
 * @param {number} data.products.product.quantity - The quantity of the product.
 * @returns {Object} - A JSON object indicating the success or failure of the email sending process.
 * @returns {string} status - The status of the operation ('success' or 'error').
 * @returns {string} payload - The message to be displayed to the client ('Email enviado' on success, 'Error sending mail' on failure).
 */
send_order = async (data) => {

        try {
            let prods = null
            for (const element of data.products) {
                prods += `<li>${element.product.title}: ${element.product.price} $ X ${element.product.quantity}</li>`
            }
            const mailOptions = {
                to: data.address,
                subject: `Order ${data.order.code}`,
                html: `
                  <div>
                  <h1>Your order ${data.order.code} has loaded succesfully</h1><br/>
                    <h1>Proucts bought</h1>                    
                    ${prods}
                  <h3>Total: ${data.order.amount}</h3>
                  </div>
                `
              };
              await this.mailservice.sendEmail(mailOptions);
              

        } catch (error) {
            logger.error('Error sending order mail', error);
        }
    }  
/**
 * Sends a welcome email to a new user upon registration.
 *
 * @param {Object} data - The data object containing the user's details and recipient's address.
 * @param {string} data.address - The email address of the recipient.
 * @param {Object} data.user - The user's details.
 * @param {string} data.user.fullname - The full name of the user. 
 */
userRegistration = async (data) => {

    try {
        const mailOptions = {
            to: data.address,
            subject: `Welcome ${data.user.fullname} to our ecommerce `,
            html: `
              <div>
              <p>Your user <b>${data.address}</b> has been created succesfully</p><br/>
                <h1>Start to buy</h1>                    
              </div>
            `
          };
          await this.mailservice.sendEmail(mailOptions);


    } catch (error) {
        logger.error('Error sending user registration mail', error);
    }
}
      
        
}

