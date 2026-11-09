# Appointment SMS notifications

The appointment form sends requests to the Express server, which uses Twilio to
send an SMS to the clinic. Keep Twilio credentials on the server; never add them
to the client.

1. Create a Twilio account and obtain an SMS-capable Twilio number. Verify the
   recipient number if your Twilio account is in trial mode.
2. In `server`, copy `.env.example` to `.env` and set your Twilio Account SID,
   Auth Token, Twilio sender number, and the phone number that should receive
   notifications. Use international format (for example, `+<country code><number>`).
3. Install/start the server with `npm install` and `npm run dev` from `server`.
4. In another terminal, run `npm install` and `npm run dev` from `client`.

The Vite development server proxies `/api` requests to the Express server on
port 3000. In production, deploy the API and configure the client/server routing
so `/api/appointments` reaches the Express server. Configure the same environment
variables in the hosting provider; do not commit `.env`.

SMS messages contain the submitted name, phone number, preferred date, and
optional message. Avoid asking patients to submit sensitive medical information
in the free-text field.