/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { DynamicFormQuestionComponent } from './dynamic-form-question.component';

describe('Component: DynamicFormQuestion', () => {
  it('should create an instance', () => {
    let component = new DynamicFormQuestionComponent();
    expect(component).toBeTruthy();
  });
});
