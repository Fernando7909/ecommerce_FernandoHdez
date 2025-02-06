import React from 'react';
import { Box, Typography } from '@mui/material';

const CondicionsUs = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Condicions d'Ús
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        Aquestes condicions d'ús regulen l'accés i l'ús dels serveis oferts per la nostra empresa. En utilitzar els nostres serveis, vostè accepta complir aquestes condicions. Si no està d'acord amb aquestes condicions, li preguem que no utilitzi els nostres serveis.
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        1. Acceptació de les Condicions
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        En accedir i utilitzar els nostres serveis, vostè accepta aquestes condicions d'ús, així com la nostra política de privadesa, que pot ser modificada en qualsevol moment. És responsabilitat de l'usuari revisar periòdicament les condicions d'ús per estar al corrent de qualsevol canvi.
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        2. Descripció dels Serveis
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        La nostra empresa proporciona diversos serveis, que poden incloure (però no es limiten a) la venda de productes, la prestació d'assistència en línia, el registre d'usuaris, i altres serveis relacionats. Els detalls específics dels serveis es proporcionaran a través de la nostra plataforma.
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        3. Ús Permès
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        L'usuari es compromet a utilitzar els nostres serveis d'acord amb les lleis i normatives aplicables. No es permet utilitzar els nostres serveis per a fins il·legals o per incomplir els drets de tercers. L'usuari es compromet a no dur a terme activitats que puguin perjudicar el funcionament dels nostres serveis o la seguretat de la plataforma.
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        4. Creació de Compte
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        Per accedir a alguns serveis, els usuaris poden ser requerits a crear un compte personalitzat. És responsabilitat de l'usuari proporcionar informació precisa i actualitzada al moment de registrar-se. L'usuari també és responsable de mantenir la confidencialitat de les seves credencials d'accés.
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        5. Preus i Pagaments
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        Els preus dels nostres serveis i productes es mostraran de manera clara a la nostra plataforma. Els pagaments es realitzaran mitjançant els mètodes disponibles, que poden incloure targetes de crèdit, dèbit, o altres opcions electròniques. L'usuari es compromet a pagar les quantitats establertes en el moment de la compra.
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        6. Prohibicions
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        L'usuari no podrà:
        <ul>
          <li>Modificar, copiar, distribuir, o transmetre els nostres serveis o contingut sense autorització expressa.</li>
          <li>Realitzar activitats que afectin la seguretat de la nostra plataforma o dels nostres usuaris.</li>
          <li>Utilitzar els serveis per a qualsevol activitat fraudulenta o il·legal.</li>
          <li>Infringir els drets de propietat intel·lectual de la nostra empresa o de tercers.</li>
        </ul>
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        7. Limitació de Responsabilitat
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        La nostra empresa no serà responsable per danys indirectes, especials o conseqüents derivats de l'ús dels nostres serveis. Això inclou qualsevol dany a l'ordinador, pèrdua de dades o interrupció del servei. La nostra responsabilitat es limitarà, en qualsevol cas, a l'import pagat per l'usuari pels serveis adquirits.
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        8. Modificacions dels Serveis
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        Ens reservem el dret de modificar o interrompre els nostres serveis en qualsevol moment, amb o sense notificació prèvia. No serem responsables per cap canvi o interrupció dels serveis.
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        9. Termini i Resolució
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        Aquestes condicions seran vàlides fins que l'usuari decideixi cancel·lar el seu compte o fins que nosaltres decidim suspendre l'ús dels serveis per a l'usuari per incompliment d'aquestes condicions. En qualsevol moment, podem suspendre o finalitzar l'accés a la plataforma en cas d'incompliment de les condicions.
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        10. Llei Aplicable
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        Aquestes condicions seran regulades i interpretades d'acord amb les lleis del país on es troba la nostra empresa, sense tenir en compte les seves disposicions sobre conflictes de lleis.
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        11. Contacte
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        Si té preguntes sobre aquestes condicions d'ús o vol exercir qualsevol dret associat a les seves dades personals, pot posar-se en contacte amb nosaltres a:
        <ul>
          <li>Email: [seu-email@domini.com]</li>
          <li>Telèfon: [seu-número-de-telèfon]</li>
        </ul>
      </Typography>
    </Box>
  );
};

export default CondicionsUs;
