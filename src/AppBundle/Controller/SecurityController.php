<?php

namespace AppBundle\Controller;

use Doctrine\ORM\EntityNotFoundException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class SecurityController extends Controller
{
    /**
     * @Route("/", name="login")
     */
    public function loginAction()
    {
        $authenticationUtils = $this->get('security.authentication_utils');
        $error = $authenticationUtils->getLastAuthenticationError();
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', array(
            'last_username' => $lastUsername,
            'error' => $error,
        ));
    }

    /**
     * @Route("/generate-code", name="login_generate_code",
     *     condition="request.request.has('email')"
     * )
     * @Method("POST")
     */
    public function generateCodeAction(Request $request)
    {
        return new Response(substr(strtoupper(md5(uniqid('test'))), 0, 10));
    }

    /**
     * @Route("/logout", name="logout")
     * @Route("/admin/logout", name="admin_logout")
     */
    public function logoutAction()
    {
        throw new \BadMethodCallException("El controlador logout no debería ejecutarse");
    }
}
