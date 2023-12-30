import { Container } from 'inversify';
import { IOfferService } from './offer-service.interface.js';
import { Component } from '../../types/index.js';
import { OfferService } from './offer.service.js';
import OfferController from './offer.controller.js';
import { Controller } from '../../libs/rest/index.js';
import {OfferRepository} from "./offer.repository.js";

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<IOfferService>(Component.OfferService).to(OfferService).inSingletonScope();
  offerContainer.bind<OfferRepository>(Component.OfferRepository).to(OfferRepository).inSingletonScope();
  offerContainer.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();

  return offerContainer;
}
