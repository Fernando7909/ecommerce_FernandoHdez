import React from 'react';
import { Box, Typography } from '@mui/material';

const PoliticaPrivadesa = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Política de Privadesa
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        A la nostra empresa, la privadesa i la seguretat de les dades dels nostres usuaris són una prioritat. Aquesta Política de Privadesa explica com recollim, utilitzem i protegim la informació personal que vostè ens proporciona en utilitzar els nostres serveis.
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        1. Informació que recollim
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        Recollim informació personal quan vostè utilitza els nostres serveis. Aquesta informació pot incloure, entre altres coses:
        <ul>
          <li>Nom i cognoms</li>
          <li>Adreça de correu electrònic</li>
          <li>Informació de contacte (adreça, telèfon, etc.)</li>
          <li>Informació de pagament (per exemple, dades de targetes de crèdit)</li>
          <li>Informació sobre l'ús dels nostres serveis, com ara l'historial de navegació i preferències</li>
        </ul>
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        2. Com utilitzem la seva informació
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        Utilitzem la seva informació personal per a les següents finalitats:
        <ul>
          <li>Proporcionar i millorar els nostres serveis</li>
          <li>Processar les seves transaccions</li>
          <li>Enviar-li comunicacions de màrqueting (si ha donat el seu consentiment)</li>
          <li>Atendre les seves sol·licituds o preguntes</li>
          <li>Complir amb les obligacions legals i contractuals</li>
        </ul>
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        3. Com compartim la seva informació
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        No compartim la seva informació personal amb tercers, excepte en els següents casos:
        <ul>
          <li>Amb proveïdors de serveis que ens ajudin a operar el nostre negoci (per exemple, processadors de pagaments, proveïdors d'allotjament web).</li>
          <li>Quan sigui requerit per llei o per ordres judicials o administratives.</li>
          <li>Si es produeix una fusió, adquisició o venda d'actius, en aquest cas la seva informació serà transferida al nou propietari.</li>
        </ul>
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        4. Seguretat de la informació
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        Implementem mesures de seguretat adequades per protegir la seva informació personal contra l'accés no autoritzat, la pèrdua o el mal ús. No obstant això, cap mètode de transmissió d'informació per Internet o mètode de magatzematge electrònic és completament segur, per la qual cosa no podem garantir la seguretat absoluta de la seva informació.
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        5. Drets sobre les seves dades
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        Segons la legislació aplicable, vostè té els següents drets respecte a la seva informació personal:
        <ul>
          <li>Accedir a la informació que tenim sobre vostè</li>
          <li>Sol·licitar la correcció o supressió de la seva informació</li>
          <li>Opositor al tractament de la seva informació en determinades circumstàncies</li>
          <li>Retirar el consentiment en qualsevol moment (sense que afecti la legalitat del tractament basat en el consentiment previ)</li>
        </ul>
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        6. Canvis en aquesta Política de Privadesa
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        Podem actualitzar aquesta Política de Privadesa de tant en tant per reflectir canvis en les nostres pràctiques de privadesa o per complir amb requisits legals. Quan fem canvis, publicarem la nova versió en aquest lloc web i actualitzarem la data de revisió al principi d'aquest document.
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        7. Contacte
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '20px' }}>
        Si té qualsevol pregunta sobre aquesta Política de Privadesa o desitja exercir els seus drets sobre les seves dades personals, pot posar-se en contacte amb nosaltres a:
        <ul>
          <li>Email: [seu-email@domini.com]</li>
          <li>Telèfon: [seu-número-de-telèfon]</li>
        </ul>
      </Typography>
    </Box>
  );
};

export default PoliticaPrivadesa;
