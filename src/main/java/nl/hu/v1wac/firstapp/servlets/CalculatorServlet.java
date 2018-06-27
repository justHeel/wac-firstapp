package nl.hu.v1wac.firstapp.servlets;

import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet(urlPatterns = "/CalculatorServlet.do")
public class CalculatorServlet extends HttpServlet {
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		int getal1 = Integer.parseInt(req.getParameter("getal1"));
		int getal2 = Integer.parseInt(req.getParameter("getal2"));

		PrintWriter out = resp.getWriter();
		resp.setContentType("text/html");

		String htmlLine = "";
		if (req.getParameter("optellen") != null) {
			int opgeteld = getal1 + getal2;
			htmlLine = htmlLine + " <h2> " + getal1 + " + " + getal2 + " = " + opgeteld + "</h2>";

		}

		else if (req.getParameter("aftrekken") != null) {
			int afgetrokken = getal1 - getal2;
			htmlLine = htmlLine + " <h2> " + getal1 + " - " + getal2 + " = " + afgetrokken + "</h2>";
		}

		else if (req.getParameter("delen") != null) {
			int gedeeld = getal1 / getal2;
			htmlLine = htmlLine + " <h2> " + getal1 + " / " + getal2 + " = " + gedeeld + "</h2>";
		}

		else if (req.getParameter("vermenigvuldigen") != null) {
			int vermenigvuldigd = getal1 * getal2;
			htmlLine = htmlLine + " <h2> " + getal1 + " * " + getal2 + " = " + vermenigvuldigd + "</h2>";
		}

		out.println("<!DOCTYPE html>");
		out.println("<html>");
		out.println(" <title>Calculator</title>");
		out.println(" <body>");
		out.println(" <h2>Calculator webapplication example</h2>");
		out.println(htmlLine);
		out.println(" </body>");
		out.println("</html>");
	}
}