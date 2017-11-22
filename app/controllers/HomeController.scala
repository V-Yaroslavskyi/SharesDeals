package controllers

import java.lang.ProcessBuilder.Redirect
import javax.inject._

import org.web3scala.Service
import org.web3scala.model.{EthSendTransactionObject, GenericResponse}
import play.api.libs.json._
import play.api.mvc._

import scala.concurrent.Await
import scala.concurrent.duration.Duration
import scala.util.parsing.json.JSON

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  /**
   * Create an Action to render an HTML page with a welcome message.
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */

  val service = new Service

  // synchronous call (returns Either[Error, Response])
  service.web3ClientVersion match {
    case Left(e) => println("Error: " + e.error)
    case Right(s) => println("Client Version: " + s.result)
  }


  def index = Action {

//    val f = service.asyncEthSendTransaction(EthSendTransactionObject("0xfBEeb424D8B7A0Ea5d1622182FD9Ad55289EF123", Some("0x29Cf90b4b26BB35c7273bEe1bA5139bC1D99A032"), Some("0x29999999"), None, Some("0x100000000000000000000"), "0x420aca5f00000000000000000000000000000000000000000000000000000000000004d2", None))
//    println(Await.result(f.future, Duration.Inf))
    Ok(views.html.smartContract())
  }

  def form = Action {
    Ok(views.html.form()).withNewSession
  }

  def formPost = Action(parse.json) {req =>
    Ok(Json.obj("url" -> routes.HomeController.generate.url)).withSession(("data", Json.stringify(req.body)))
  }

  def generate = Action {request =>
    val d = request.session.get("data").getOrElse("")
    Ok(views.html.generate(d))
  }

  def generatePost = Action(parse.json) {request =>
//    val contract =
    Ok(Json.obj("url" -> routes.HomeController.finalPage().url))
//    Ok(views.html.generate(d))
  }

  def finalPage = Action{
    Ok(views.html.finalPage())
  }
}
